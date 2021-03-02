using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Helpers;

namespace react_crash_2021.Models
{
    /// <summary>
    /// This is the class that makes the JWT token to be used for authenitcation
    /// more info here: https://dotnetcoretutorials.com/2020/01/15/creating-and-validating-jwt-tokens-in-asp-net-core/
    /// </summary>
    public class AuthService : IAuthService
    {
        private string jwtSecret;
        private int jwtLifespan;
        private string jwtIssuer;
        public AuthService(string jwtSecret, int jwtLifespan, string jwtIssuer)
        {
            this.jwtSecret = jwtSecret;
            this.jwtLifespan = jwtLifespan;
            this.jwtIssuer = jwtIssuer;
        }
        public AuthData GetAuthData(Guid id)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    //Claims are actually a simple concept, but too many articles go into the “abstract” thought process around them. In really simply terms, a claim is a “fact” stored in the token about the user/person that holds that token.
                    new Claim("Id", id.ToString())
                }),
                Expires = expirationTime,
                Issuer = jwtIssuer,
                //Audience = jwtIssuer,
                //see here for more info about utc.now: https://stackoverflow.com/questions/62151/datetime-now-vs-datetime-utcnow
                IssuedAt = DateTime.UtcNow,
                // new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return new AuthData
            {
                Token = token,
                TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
                Id = id
            };
        }

        //public string HashPassword(string password)
        //{
        //    return Crypto.HashPassword(password);
        //}

        //public bool VerifyPassword(string actualPassword, string hashedPassword)
        //{
        //    return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        //}
    }
}
