export const Card = () => {
  return (
    <main className='bg-black text-white h-screen flex justify-center items-center gap-16'>
      <div>
        <form action=''>
          <div>
            <label htmlFor=''>NÚMERO DO CARTÃO</label>
            <input type='text' name='NÚMERO DO CARTÃO' required />
          </div>

          <div>
            <label htmlFor=''>NOME DO TITULAR</label>
            <input type='text' name='NOME DO TITULAR' required />
          </div>

          <div>
            <label htmlFor=''>EXPIRAÇÃO</label>
            <input type='text' name='EXPIRAÇÃO' required />
          </div>

          <div>
            <label htmlFor=''>CVC</label>
            <input type='text' name='CVC' required />
          </div>
          <button type='submit'>ADICIONAR CARTAO</button>
        </form>
      </div>

      <div className='w-[360px] h-[230px] bg-zinc-100 bg-opacity-75 border border-white rounded-md'></div>
    </main>
  )
}
