/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Markdown Previewer Tests', () => {
  test('renders editor and preview areas', () => {
    render(<App />);
    const editorElement = screen.getByTestId('editor');
    const previewElement = screen.getByTestId('preview');
    
    expect(editorElement).toBeInTheDocument();
    expect(previewElement).toBeInTheDocument();
  });

  test('updates preview when text is added', () => {
    render(<App />);
    const editorElement = screen.getByTestId('editor');
    const previewElement = screen.getByTestId('preview');

    fireEvent.change(editorElement, { target: { value: '# Header' } });
    
    expect(previewElement).toHaveTextContent('Header');
  });

  test('renders basic Markdown correctly', () => {
    render(<App />);
    const editorElement = screen.getByTestId('editor');
    const previewElement = screen.getByTestId('preview');

    fireEvent.change(editorElement, { target: { value: '**Bold Text**' } });
    
    expect(previewElement).toHaveTextContent('Bold Text');
    expect(previewElement.querySelector('strong')).toBeInTheDocument();
  });

  test('renders code blocks correctly', () => {
    render(<App />);
    const editorElement = screen.getByTestId('editor');
    const previewElement = screen.getByTestId('preview');

    fireEvent.change(editorElement, { target: { value: '```js\nconst x = 10;\n```' } });
    
    expect(previewElement).toHaveTextContent('const x = 10;');
    expect(previewElement.querySelector('pre')).toBeInTheDocument();
  });

  test('renders lists and images correctly', () => {
    render(<App />);
    const editorElement = screen.getByTestId('editor');
    const previewElement = screen.getByTestId('preview');

    fireEvent.change(editorElement, { target: { value: '- Item 1\n- Item 2\n![Alt Text](https://example.com/image.png)' } });
    
    expect(previewElement).toHaveTextContent('Item 1');
    expect(previewElement).toHaveTextContent('Item 2');
    expect(previewElement.querySelector('img')).toHaveAttribute('src', 'https://example.com/image.png');
  });
});
