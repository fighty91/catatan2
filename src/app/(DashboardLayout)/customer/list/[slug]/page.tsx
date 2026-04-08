// app/blog/[slug]/page.js

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

export default async function CustomerList({
  params
} : {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  return (
    <PageContainer title="Customer Page" description="this is Customer page">
      <h1>Membaca Artikel: {slug}</h1>
      <p>Ini adalah konten untuk artikel dengan slug: {slug}</p>
    </PageContainer>
  );
}
