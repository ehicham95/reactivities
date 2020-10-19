using FluentValidation;

namespace Application.validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Password should contain 6 characters")
                .Matches("[A-Z]").WithMessage("Password should have at least one uppercase letter")
                .Matches("[a-z]").WithMessage("Password should have at least one lowercase letter")
                .Matches("[0-9]").WithMessage("Password should have at least one number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain none alphanumeric character");

            return options;
        }
    }
}