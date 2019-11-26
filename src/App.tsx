import * as React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Heap from "@DataStructures/Heap/Components/Heap";

enum DataStructures {
    Heap = 1,
    BST = 2,
    AVL = 3,
    RedBlack = 4,
}

interface Props {}
interface State {
    selectedDataStucture: DataStructures;
}

const algorithmSelectionContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const radioButtonsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
};

export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedDataStucture: DataStructures.Heap,
        };
    }

    onChangeSelectedDataStructure = (e) => {
        this.setState({selectedDataStucture: parseInt(e.target.value)});
    }

    renderContent() {
        switch (this.state.selectedDataStucture) {
            case DataStructures.Heap:
                return <Heap />;
                break;
        
            default:
                return null;
        }
    }

    renderSelection() {
        return(
            <div style={algorithmSelectionContainerStyle}>
                <RadioGroup aria-label="Selected Data Structure" name="SelectedDataStructure" value={this.state.selectedDataStucture} onChange={this.onChangeSelectedDataStructure} style={radioButtonsContainerStyle}>
                    <FormControlLabel value={DataStructures.Heap} control={<Radio />} label="Heap" />
                    <FormControlLabel value={DataStructures.BST} control={<Radio />} label="Binary Search Tree" />
                    <FormControlLabel value={DataStructures.AVL} control={<Radio />} label="AVL Tree" />
                    <FormControlLabel value={DataStructures.RedBlack} control={<Radio />} label="Red Black Tree" />
                </RadioGroup>
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.renderSelection()}
                {this.renderContent()}
            </div>

        );

    }
}
export default App;
