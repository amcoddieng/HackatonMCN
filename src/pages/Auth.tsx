import AuthForm from "../components/AuthForm";

export const Auth = () => {
  return <AuthForm onSuccess={() => window.location.href = "/account"} />;
};
