import { PostForm, Container } from "../components";
function AddPost(){
    return(
        <div className='py-8 bg-[#19191c]'>
            <div><h1 className=' text-[2rem] md:text-[2.5rem] text-center font-semibold text-white' >Add Post</h1></div>
            <Container >
                <PostForm />
            </Container>
        </div>
    )
}
export default AddPost;