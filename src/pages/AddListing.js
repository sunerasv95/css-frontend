import { Container, Row, Col } from 'react-bootstrap';
import PageHeading from '../components/PageHeading/PageHeading';

const AddListing = () => {
  return (
    <Container>
        <Row>
            <Col md={12}>
				<PageHeading title="Add Listing" />
			</Col>
        </Row>
        <Row>
            <Col md={6}>
				form
			</Col>
            <Col md={6}>
				button
			</Col>
        </Row>
    </Container>
  )
}

export default AddListing;