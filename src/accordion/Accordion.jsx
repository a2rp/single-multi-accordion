import { useEffect, useState } from "react";
import {
    FiArrowUp,
    FiBookOpen,
    FiCheckCircle,
    FiChevronDown,
    FiCode,
    FiCoffee,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLayers,
    FiMail,
} from "react-icons/fi";
import qnaList from "./qna.json";
import styles from "./styles.module.scss";

const connectLinks = [
    ["Portfolio", "https://www.ashishranjan.net/", FiGlobe],
    ["GitHub", "https://github.com/a2rp", FiGithub],
    ["CodePen", "https://codepen.io/ash1198", FiCode],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLayers],
    ["Facebook", "https://www.facebook.com/theash.ashish/", FiGlobe],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FiBookOpen],
    ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
];

const supportLinks = [
    ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
    ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
    ["Patreon", "https://patreon.com/a2rp", FiBookOpen],
];

function LinkIcons({ links }) {
    return (
        <div className={styles.footerLinks}>
            {links.map(([label, href, Icon]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon aria-hidden="true" />
                </a>
            ))}
        </div>
    );
}

function Accordion() {
    const [allowMulti, setAllowMulti] = useState(false);
    const [openId, setOpenId] = useState(null);
    const [openIds, setOpenIds] = useState([]);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 420);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMode = () => {
        setAllowMulti((current) => !current);
        setOpenId(null);
        setOpenIds([]);
    };

    const toggleQuestion = (id) => {
        if (allowMulti) {
            setOpenIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
            return;
        }
        setOpenId((current) => current === id ? null : id);
    };

    const isOpen = (id) => allowMulti ? openIds.includes(id) : openId === id;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <a className={styles.brand} href="#top" aria-label="Accordion home">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" />
                    <span><small>A2RP LAB</small>Accordion</span>
                </a>
                <div className={styles.headerNote}><FiCheckCircle aria-hidden="true" /> Accessible Q&A pattern</div>
            </header>

            <main className={styles.container} id="top">
                <section className={styles.hero}>
                    <div>
                        <p className={styles.kicker}>REUSABLE REACT COMPONENT</p>
                        <h1>Single and multi-open accordion patterns.</h1>
                        <p className={styles.intro}>Explore a focused FAQ interface with a simple switch between one open answer and multiple open answers.</p>
                    </div>
                    <div className={styles.modeCard}>
                        <FiLayers aria-hidden="true" />
                        <div>
                            <strong>{allowMulti ? "Multi-open mode" : "Single-open mode"}</strong>
                            <span>{allowMulti ? "Open several answers together" : "Keep one answer open at a time"}</span>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={allowMulti} onChange={toggleMode} aria-label="Enable multi-open mode" />
                            <span className={styles.switchTrack}><span /></span>
                        </label>
                    </div>
                </section>

                <section className={styles.listSection} aria-labelledby="questions-title">
                    <div className={styles.sectionHeading}>
                        <div><p className={styles.kicker}>DEMO QUESTIONS</p><h2 id="questions-title">How does it work?</h2></div>
                        <span className={styles.count}>{qnaList.length} questions</span>
                    </div>
                    <div className={styles.questionList}>
                        {qnaList.map((item) => {
                            const expanded = isOpen(item.id);
                            const answerId = `answer-${item.id}`;
                            return (
                                <article className={`${styles.item} ${expanded ? styles.open : ""}`} key={item.id}>
                                    <button className={styles.question} type="button" onClick={() => toggleQuestion(item.id)} aria-expanded={expanded} aria-controls={answerId}>
                                        <span>{item.question}</span>
                                        <FiChevronDown className={styles.chevron} aria-hidden="true" />
                                    </button>
                                    <div className={styles.answerWrap} id={answerId} hidden={!expanded}>
                                        <p className={styles.answer}>{item.answer}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerMain}>
                    <strong>Simple patterns for better interfaces.</strong>
                    <span>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></span>
                </div>
                <div className={styles.footerGroups}><LinkIcons links={connectLinks} /><LinkIcons links={supportLinks} /></div>
            </footer>

            {showTop && <button className={styles.toTop} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top" title="Go to top"><FiArrowUp aria-hidden="true" /></button>}
        </div>
    );
}

export default Accordion;