const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchPublicProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/profile`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Error fetching public profile:', err);
    return null;
  }
}

export async function fetchPublicProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  } catch (err) {
    console.error('Error fetching public projects:', err);
    return [];
  }
}

export async function fetchPublicArticles() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/articles`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error('Error fetching public articles:', err);
    return [];
  }
}

export async function fetchPublicSeo() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/seo`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.seo || null;
  } catch (err) {
    console.error('Error fetching public SEO settings:', err);
    return null;
  }
}

export async function recordPublicVisit() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Error recording public visit:', err);
    return null;
  }
}
