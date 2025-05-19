import { Routes, Route } from 'react-router-dom';
import InvoiceEditor from './components/InvoiceEditor';
import InvoiceTemplateOverlay from './components/InvoiceTemplateOverlay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvoiceEditor />} />
      <Route path="/preview" element={<InvoiceTemplateOverlay />} />
    </Routes>
  );
}

export default App;
