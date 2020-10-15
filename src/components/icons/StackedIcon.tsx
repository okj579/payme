import {createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import {Component} from "react";

const styles = createStyles({
    root: {
        display: 'inline-block',
        position: 'relative',
        marginLeft: 5,
        '& > :nth-child(2)': {
            position: 'absolute',
            transform: 'scale(0.6) translate(-130%, 40%)',
        }
    }
});

class StackedIcon extends Component<WithStyles> {
    render() {
        const { classes, children } = this.props;
        return <span className={classes.root}>{children}</span>;
    }
}

export default withStyles(styles)(StackedIcon);