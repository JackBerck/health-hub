import Authentication from "@/components/Authentication";
import RegisterForm from "@/components/Authentication/Register";

export const metadata = {
  title: "Daftar | HealthHub",
  description: "Daftar untuk mendapatkan akses penuh ke HealthHub",
};

export default function Register() {
  return (
    <Authentication
      id="register"
      sideImage="/img/backgrounds/woman-with-balloons.jpg"
      direction="left"
      quote='"Kekayaan yang paling utama adalah kesehatan." -Ralph Waldo Emerson'
    >
      <RegisterForm />
    </Authentication>
  );
}