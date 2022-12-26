import useRedirectLoggedOutUser from 'pinvent/hooks/useRedirect';

export default function Dashboard() {
  useRedirectLoggedOutUser('/login');
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
