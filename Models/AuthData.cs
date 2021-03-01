using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    /// <summary>
    /// Provides all the info our react needs to deal with a user: 
    /// </summary>
    public class AuthData
    {
        /// <summary>
        /// the jwt token string
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// when the token expires
        /// </summary>
        public long TokenExpirationTime { get; set; }
            /// <summary>
            /// id of the authenticated user
            /// </summary>
        public Guid Id { get; set; }
    }
}
