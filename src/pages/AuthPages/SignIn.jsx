import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign in"
        description="Manage your clothing store with ease. Sign in to access your dashboard."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
