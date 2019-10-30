import * as React from "react";
import Button from "@material-ui/core/Button";
import { TextField, InputLabel } from "@material-ui/core";
import {
    TreeComponent,
    buildTreeData,
} from "@DataStructures/Tree/Components/TreeComponent";
import { Heap as HeapTree } from "@DataStructures/Heap/Heap";

interface Props {}
interface State {
    inputValue: string;
    isValidInput: boolean;
    heap: HeapTree;
}

const VALID_INPUT_REGEX = "^[0-9]*(,[0-9]*)*$";

const styles = {
    buttonContainer: {
        display: "flex",
    } as React.CSSProperties,
};
export class Heap extends React.Component<Props, State> {
    private regex = RegExp(VALID_INPUT_REGEX);
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: "",
            isValidInput: true,
            heap: new HeapTree([], false),
        };
    }

    onClickGetMinHeap = () => {
        if (this.regex.test(this.state.inputValue)) {
            const heapData = this.state.inputValue
                .split(",")
                .map(x => parseInt(x));
            this.setState({
                heap: new HeapTree(heapData, true),
            });
        } else {
            this.setState({
                isValidInput: false,
            });
        }
    };

    onClickGetMaxHeap = () => {
        if (this.regex.test(this.state.inputValue)) {
            const heapData = this.state.inputValue
                .split(",")
                .map(x => parseInt(x));
            this.setState({
                heap: new HeapTree(heapData, false),
            });
        } else {
            this.setState({
                isValidInput: false,
            });
        }
    };

    onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: e.currentTarget.value.trim(),
            isValidInput: this.regex.test(e.currentTarget.value.trim()),
        });
    };

    renderInput() {
        return (
            <TextField
                error={!this.state.isValidInput}
                label={this.state.isValidInput ? "" : "Error"}
                helperText={this.state.isValidInput ? "" : "Incorrect entry."}
                margin="normal"
                variant="outlined"
                onChange={this.onChangeInputValue}
            />
        );
    }

    renderValidationErrors() {
        if (!this.state.isValidInput) {
            return <InputLabel error={true}>Invalid Input</InputLabel>;
        }
    }

    renderGetMaxHeapButton() {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={this.onClickGetMaxHeap}
                disabled={!this.state.isValidInput}
            >
                Show Max Heap
            </Button>
        );
    }

    renderGetMinHeapButton() {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={this.onClickGetMinHeap}
                disabled={!this.state.isValidInput}
            >
                Show Min Heap
            </Button>
        );
    }

    renderTree() {
        if (this.state.heap.getData().length > 0) {
            return (
                <TreeComponent
                    data={buildTreeData(this.state.heap.getData())}
                />
            );
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>{this.renderInput()}</div>
                    <div style={styles.buttonContainer}>
                        {this.renderGetMaxHeapButton()}
                        {this.renderGetMinHeapButton()}
                    </div>
                </div>
                {this.renderTree()}
            </div>
        );
    }
}

export default Heap;
