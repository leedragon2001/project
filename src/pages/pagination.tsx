import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { useState } from 'react';
import './pagination.scss'

const Paginate = () => {
    const [current, setCurrent] = useState(1);

    const onChange: PaginationProps['onChange'] = page => {
        setCurrent(page);

    };

    return <Pagination current={current} onChange={onChange} total={10} />;
};

export default Paginate;