// app/(private routes)/profile/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import css from './Profile.module.css';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Your Profile on NoteHub',
  description: 'Personal profile for making notes',
  openGraph: {
    title: 'Your Profile on NoteHub',
    description: 'Personal profile for making notes',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub Logo',
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

  return (
    <section className={css.container}>
      <div>
        <h1 className={css.title}>My Profile</h1>
      </div>

      <Link href="/profile/edit" className={css.edit}>
        Edit profile
      </Link>

      <div>
        <Image
          src={user.avatar ?? 'https://ac.goit.global/fullstack/default_avatar.jpg'}
          alt={user.email ?? 'User avatar'}
          width={200}
          height={200}
        />
      </div>

      <div>
        <h2 className={css.text}>Name: {user.username}</h2>
        <h2 className={css.text}>Email: {user.email}</h2>
        <p className={css.text}>Information about: {user.username}</p>
      </div>
    </section>
  );
}
