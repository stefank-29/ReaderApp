import Image from 'next/image';
import Link from 'next/link';
import { FaRegBookmark, FaPlus } from 'react-icons/fa';
import HeaderStyles from '../styles/HeaderStyles';

export default function Header() {
    return (
        <HeaderStyles>
            <div className="container">
                <Link href="/">
                    <a className="logo">
                        <Image
                            src="/book-logo.png"
                            alt="Library app"
                            layout="fill"
                        />
                    </a>
                </Link>
                <div className="menu">
                    <Link href="/lists">
                        <a className="link">
                            <div className="item">
                                <FaRegBookmark className="icon" />
                                <span className="label">My lists</span>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </HeaderStyles>
    );
}
