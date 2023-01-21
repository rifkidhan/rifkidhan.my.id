import Form from './Form'

export default async function CreatePostPage() {
  return (
    <main className="container mx-auto my-10 flex flex-col gap-5">
      <h1>Bikin Post Kamu</h1>
      <Form />
    </main>
  )
}
