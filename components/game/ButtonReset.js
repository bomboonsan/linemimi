export default function ButtonReset() {
    const handdleReset = () => {
        window.location.reload();
    }
    return (
    <>
        <button className="btn btn-primary btn-sm font-normal" onClick={handdleReset}>
            เล่นใหม่
        </button>
    </>
    )
}
