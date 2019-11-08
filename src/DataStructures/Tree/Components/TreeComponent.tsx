import * as React from "react";
import { Tree, ReactD3TreeItem, ReactD3TreeTranslate } from "react-d3-tree";
import { fill } from "lodash";
import { isNullOrUndefined } from "util";

export interface Props {
    data: number[];
    style: React.CSSProperties;
}

interface State {
    translate?: Partial<ReactD3TreeTranslate>;
    treeData: ReactD3TreeItem[];
}

export const buildTreeData = (data: number[]): ReactD3TreeItem[] => {
    if (data.length === 0) {
        return [];
    }
    const treeData: ReactD3TreeItem[] = [];
    const seen: boolean[] = fill(new Array(data.length), false);

    for (let i = 0; i < data.length; i++) {
        let node: ReactD3TreeItem = null;
        if (seen[i]) {
            node = treeData.find(x => x.name === i.toString());
        } else {
            seen[i] = true;
            node = {
                name: i.toString(),
                attributes: {
                    value: data[i].toString(),
                },
                children: [],
            };

            const parentIndex = Math.floor((i - 1) / 2);
            const parentNode = treeData.find(
                x => x.name === parentIndex.toString()
            );
            if (!isNullOrUndefined(parentNode)) {
                parentNode.children.push(node);
            }
        }

        treeData.push(node);
    }

    return treeData;
};

export class TreeComponent extends React.Component<Props, State> {
    private treeContainer: HTMLDivElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            treeData: buildTreeData(props.data),
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (
            prevProps.data.length !== this.props.data.length ||
            !this.props.data.every((v, i) => v === prevProps.data[i])
        ) {
            const dimensions = this.treeContainer.getBoundingClientRect();
            this.setState({
                treeData: buildTreeData(this.props.data),
                translate: {
                    x: dimensions.width / 2,
                    y: dimensions.height / 2,
                },
            });
        }
    }

    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: dimensions.height / 2,
            },
        });
    }

    render() {
        if (this.props.data.length === 0) {
            return null;
        }
        return (
            <div
                id="treeWrapper"
                style={this.props.style}
                ref={tc => (this.treeContainer = tc)}
            >
                <Tree
                    data={this.state.treeData}
                    orientation="vertical"
                    pathFunc="straight"
                    translate={this.state.translate}
                />
            </div>
        );
    }
}

export default TreeComponent;
