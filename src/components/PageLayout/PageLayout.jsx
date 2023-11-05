import pageLayout from './PageLayout.module.css';

const PageLayout = ({ children }) => {
    return (
        <div className={pageLayout.content}>
            {children}
        </div>
    );
}

export default PageLayout;
