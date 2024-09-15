import { Form } from 'react-bootstrap';
import categories from "../categories";

interface FilterProps {
    onSelectedCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectedCategory }: FilterProps) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Select onChange={(e) => onSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default ExpenseFilter;
