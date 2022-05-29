import { FC } from 'react';
import { Date } from '@components/common';
import readTime from '@libs/readTime';
import s from './Title.module.css';

interface Props {
  title: string;
  subtitle: string;
  published: string;
  author: string;
  updated: string;
  readtime: string;
}

const BlogTitle: FC<Props> = ({
  title,
  subtitle,
  published,
  author,
  updated,
  readtime
}) => {
  const calcReadTime = readTime(readtime);
  return (
    <>
      <div className={s.title}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className={s.info}>
        <div>
          Posted <Date dateString={published} /> by {author}
        </div>
        <div>
          Last Updated <Date dateString={updated} />
        </div>
        <div>{calcReadTime}</div>
      </div>
    </>
  );
};

export default BlogTitle;
