// app/profile/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { useAuthStore } from '@/lib/store/userStore';

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar ?? 'https://ac.goit.global/fullstack/default_avatar.jpg'}
            alt={user?.email ?? 'User avatar'}
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username ?? 'Anonymous user'}</p>
          <p>Email: {user?.email ?? 'No email'}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
