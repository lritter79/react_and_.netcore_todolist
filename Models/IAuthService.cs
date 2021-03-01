using System;

namespace react_crash_2021.Models
{
    public interface IAuthService
    {
        public AuthData GetAuthData(Guid id);
    }
}