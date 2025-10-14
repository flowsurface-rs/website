export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/flowsurface-rs/flowsurface/releases/latest'
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const release = await response.json();

    return new Response(
      JSON.stringify({
        version: release.tag_name,
        publishedAt: release.published_at,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400', // 24 hours
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        version: 'v0.8.5', // fallback version
        error: 'Failed to fetch latest release',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // 1 hour on error
        },
      }
    );
  }
}
