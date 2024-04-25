import React, { useEffect, useState } from "react";
import qnaList from "./qna.json";
import styles from "./styles.module.scss";

const Accordion = () => {
    const [qna, setQna] = useState(qnaList);

    const [allowMulti, setAllowMulti] = useState(false);
    const [clickedQna, setClickedQna] = useState(0);
    const [clickedMultiQna, setMultiClickedQna] = useState([]);

    useEffect(() => {
        // console.log(allowMulti, "allowMulti");
        setClickedQna(0);
        setMultiClickedQna([]);
    }, [allowMulti]);

    const handleQnaClick = (id) => {
        if (clickedQna === id) {
            setClickedQna(0);
        } else {
            if (clickedQna !== 0) {
                document.querySelector(".answer" + clickedQna).style.cssText = `height: 0;`;
                console.log(0);
            }
            setClickedQna(id);
            if (document.querySelector(".answer" + id)) {
                document.querySelector(".answer" + id).style.cssText = `height: 200px;`;
                console.log("yes");
            }
        }
    };

    const handleMultiQnaClick = (qna) => {
        setMultiClickedQna(null);
        let newArray = [...clickedMultiQna];
        // console.log(clickedMultiQna.indexOf(qna));
        if (newArray.includes(qna)) {
            newArray = newArray.filter(item => item !== qna);
            // console.log("includes");
        } else {
            newArray.push(qna);
            // console.log("not includes");
        }
        setMultiClickedQna(clickedMultiQna => newArray);
        // console.log(newArray);
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.title}>Accordion</div>
                <div className={styles.enableMultiToggleContainer}>
                    <input
                        type="checkbox"
                        id="accordionMultiToggleCheckbox"
                        onChange={() => setAllowMulti(allowMulti => !allowMulti)}
                    />
                    <label
                        value={allowMulti}
                        htmlFor="accordionMultiToggleCheckbox"
                    >check to enable multi-toggling</label>
                </div>

                <div className={styles.qnaListContainer}>
                    {qna ? qna.map(item => (
                        <div key={item.id} onClick={() => { !allowMulti ? handleQnaClick(item.id) : handleMultiQnaClick(item.id) }}>
                            <div className={styles.questionContainer}>
                                {item.question}
                                <span className={styles.plusSign}>+</span>
                            </div>
                            <div className={styles.answerContainer}>
                                {!allowMulti ? <>
                                    {item.id === clickedQna
                                        ? <div className={`${styles.answer} answer${item.id}`}>{item.answer}</div>
                                        : ""}
                                </> : <>
                                    {clickedMultiQna.includes(item.id)
                                        ? <div className={`${styles.answer} answer${item.id}`}>{item.answer}</div>
                                        : ""}
                                </>}
                            </div>
                        </div>
                    )) : "No qna found"}
                </div>
            </div>
        </div>
    )
}

export default Accordion;

