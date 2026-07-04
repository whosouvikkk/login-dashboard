import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-black text-primary mb-4 shadow-glow">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-text-muted text-sm max-w-md mb-8">
        The requested endpoint or service sandbox does not exist on the MoonWitch network.
      </p>
      <Link to="/" className="btn-primary">Return to Base</Link>
    </div>
  );
}
