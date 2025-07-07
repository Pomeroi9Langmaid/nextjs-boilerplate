import Link from 'next/link';

// Your existing imports and code...

export default function HomePage() {
  // your existing code

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link href="/" style={{ marginRight: '1rem' }}>Lead Tracker</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      {/* Your existing Lead Tracker UI below */}
      <main style={{ padding: '2rem' }}>
        {/* existing UI */}
      </main>
    </>
  );
}