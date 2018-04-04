import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
    return (
        <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
            <Menu.Item key="/">
                <Link to="/">
                    <Icon type="home" />Home
                </Link>
            </Menu.Item>
            <Menu.Item key="/users">
                <Link to="/users">
                    <Icon type="bars" />Users
                </Link>
            </Menu.Item>
            <Menu.Item key="/usersA">
                <Link to="/usersA">
                    <Icon type="bars" />UsersA
                </Link>
            </Menu.Item>
            <Menu.Item key="/umi">
                <a href="https://github.com/umijs/umi">umi</a>
            </Menu.Item>
            <Menu.Item key="/dva">
                <a href="https://github.com/dvajs/dva">dva</a>
            </Menu.Item>
            <Menu.Item key="/404">
                <Link to="/404">
                    <Icon type="frown-circle" />404
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default Header;
