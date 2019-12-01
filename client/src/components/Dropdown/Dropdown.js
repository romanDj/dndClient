import React from "react";

/**
 * Компонент выпадающего списка
 */
export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusOpen: false
        };

        this.outsideClick = this.outsideClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.dropDownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("click", this.outsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.outsideClick, false);
    }

    outsideClick(e) {
        if (!this.dropDownRef.current.contains(e.target) && this.state.statusOpen) {
            this.setState({statusOpen: false});
        }
    }

    toggle() {
        this.setState({statusOpen: !this.state.statusOpen});
    }

    render() {
        let {Style, children, Overlay} = this.props;
        return <div className={Style} ref={this.dropDownRef} onClick={this.toggle}>
            {children}
            {this.state.statusOpen && <Overlay/>}
        </div>
    }
}
