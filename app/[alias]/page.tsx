import { redirect } from 'next/navigation';
import { findUrlByAlias } from '@/lib/findUrlByAlias';

interface PageProps {
  params: Promise<{ alias: string }>;
}

export default async function AliasPage({ params }: PageProps) {
  const { alias } = await params;
  const targetUrl = await findUrlByAlias(alias);

  if (!targetUrl) {
    redirect('/');
  }

  redirect(targetUrl);
}
