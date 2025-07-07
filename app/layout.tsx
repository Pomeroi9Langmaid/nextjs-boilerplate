import NavBar from './components/NavBar';

export const metadata = {
  title: 'Lead Tracker',
  description: 'Manage your leads effectively',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#f9fafb' }}>
        <NavBar />
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}