import { PageProvider } from '@/context/PageContext';
import Management from '@/pages/Management';

const App = () => {
  return (
    <div>
      <PageProvider>
        <Management />
      </PageProvider>
    </div>
  );
};

export default App;
