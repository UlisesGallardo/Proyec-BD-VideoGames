import { Container } from 'react-bootstrap';
import SearchForm from './SearchForm';
import TopCard from './TopCard';

function SearchPage() {
    return (
        <div>
            <Container className='mt-5 mb-5'>
                <SearchForm/>
            </Container>
        </div>
    )
}

export default SearchPage
