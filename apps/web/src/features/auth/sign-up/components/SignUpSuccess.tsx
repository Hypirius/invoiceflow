import AuthRedirect from "../../components/AuthRedirect";
import AuthSuccess from "../../components/AuthSuccess";

function SignUpSuccess() {
  return (
    <AuthSuccess>
      <h3 className="text-[24px] font-bold">Success!</h3>
      <p>User successfully authenicated, redirecting to dashboard...</p>
      <AuthRedirect
        prompt="Not redirected? Please move manually to"
        href="/user/dashboard"
        linkText="dashboard"
      />
    </AuthSuccess>
  );
}

export default SignUpSuccess;
