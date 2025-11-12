import css from './Footer.module.css';

const devName = 'Samir Sharif';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: {devName}</p>
          <p>
            Contact us:
            <a href="mailto:samirsharif6969@gmail.com"> samirsharif6969@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
