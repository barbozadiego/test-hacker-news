const Loader = ({ message }) => (
    <div className="loader-modal">
        <div className='lds-spinner'>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div className='message'>
            <p>{message}</p>
        </div>
    </div>
)

export default Loader