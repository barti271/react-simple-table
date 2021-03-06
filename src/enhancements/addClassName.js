import React, {PropTypes} from "react";

export default suffix => WrappedElement => {

    function ElementWithClassName(props, context) {
        const className = `${context.className}${suffix}`;

        return (
            <WrappedElement
                {...props}
                className={className}
            />
        );
    }

    ElementWithClassName.contextTypes = {
        className: PropTypes.string,
    };

    return ElementWithClassName;

}
