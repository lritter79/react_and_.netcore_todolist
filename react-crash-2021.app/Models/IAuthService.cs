using System;

namespace react_crash_2021.Models
{
    public interface IAuthService
    {
        /// <summary>
        /// Returns a token for user to user for a session
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public AuthData GetAuthData(Guid id);
    }
}