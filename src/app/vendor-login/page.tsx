
import VendorLoginForm from '@/components/auth/vendor-login-form';
import { Logo } from '@/components/logo';

export default function VendorLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <VendorLoginForm />
      </div>
    </div>
  );
}
