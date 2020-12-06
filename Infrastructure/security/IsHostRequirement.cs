using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            /*
            *The if condition is here to make sure we get activity ID.
            *Since the upgrade to .NET Core 3 AuthorizationFilter is not longer supported but also needed in certain periode
            */
            var id = new Guid();
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                id = Guid.Parse(authContext.RouteData.Values["id"].ToString());
            } else {
                id = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.ToDictionary(x => x.Key, x => x.Value)["id"].ToString());
            }
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var activityId = id;

            var activity = _context.Activities.FindAsync(activityId).Result;

            var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == currentUserName)
                context.Succeed(requirement);
            else context.Fail();
            

            return Task.CompletedTask;
        }
    }
}