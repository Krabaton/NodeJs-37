const Send = ({ value, onChange, onSend }) => {
  return (
    <form className="input-group mb-3" onSubmit={onSend}>
      <input className="form-control" value={value} onChange={onChange} />
      <button className="btn btn-primary" type="submit">
        Отправить
      </button>
    </form>
  )
}

export default Send
