import Authentication from "@/components/Authentication";
import LoginForm from "@/components/Authentication/Login";

export const metadata = {
  title: "Masuk | HealthHub",
  description: "Masuk untuk mendapatkan akses penuh ke HealthHub",
};

export default function Login() {
  return (
    <Authentication
      id="login"
      sideImage="/img/backgrounds/people-smilling.jpg"
      direction="right"
      quote='"Jaga tubuhmu. Itulah satu-satunya tempat yang kamu miliki untuk hidup." -Jim Rohn'
    >
      <LoginForm />
    </Authentication>
  );
}
