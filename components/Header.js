import Image from 'next/image';
import Link from 'next/link';
import { FaRegBookmark, FaPlus } from 'react-icons/fa';
import { useModal } from '../lib/modalState';
import HeaderStyles from '../styles/HeaderStyles';

export default function Header() {
    const { setIsModalVisible } = useModal();

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
                    <div
                        className="item"
                        onClick={() => setIsModalVisible(true)}
                    >
                        <FaPlus className="icon" />
                        <span className="label">Create list</span>
                    </div>
                    <Link href="/lists">
                        <a className="link">
                            <div className="item">
                                <FaRegBookmark className="icon down" />
                                <span className="label">My lists</span>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </HeaderStyles>
    );
}
