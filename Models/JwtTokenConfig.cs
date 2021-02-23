using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    /// <summary>
    /// from https://codeburst.io/jwt-auth-in-asp-net-core-148fb72bed03
    /// The property Secret is a string that needs to be kept in a secure place, for example, 
    /// the app pool user’s environment variables, or a cloud secret store or key vault. 
    /// The AccessTokenExpiration and RefreshTokenExpiration are two integers representing 
    /// the total lifetimes of the tokens since they were generated. The times are in minutes 
    /// based on the implementation of this demo project. For simplicity purposes, we will store the parameters in the 
    /// appsettings.json file. 
    /// Then we are ready to pass the values into the JWT Bearer configurations.
    /// </summary>
    public class JwtTokenConfig
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int AccessTokenExpiration { get; set; }
        public int RefreshTokenExpiration { get; set; }
    }
}
