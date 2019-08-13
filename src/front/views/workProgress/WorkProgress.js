// @flow

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import {
  AnimatedView,
  Panel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol,
} from '../../components';
import { type RouterProps } from '../../types/react-router';

type Props = {
  actions: {
    enterWorkProgress: () => any,
    leaveWorkProgress: () => any,
  },
} & RouterProps;

const source = `
  // import
  import { EarningGraph } from './_SOMEWHERE_/components';

  // labels and data (in state for example):
  state = {
    headers: ['#', 'Project', 'Manager', 'Deadline', 'Status', 'Progress'],
    content: [
      ['1', 'Facebook', 'Mark', '10/10/2014', <span className="label label-danger">in progress</span>, <span className="badge badge-info">50%</span>],
      ['2', 'Twitter', 'Evan', '10/8/2014', <span className="label label-success">completed</span>, <span className="badge badge-success">100%</span>],
      ['3', 'Google', 'Larry', '10/12/2014', <span className="label label-warning">in progress</span>, <span className="badge badge-warning">75%</span>],
      ['4', 'LinkedIn', 'Allen', '10/01/2015', <span className="label label-info">in progress</span>, <span className="badge badge-info">65%</span>],
      ['5', 'Tumblr', 'David', '01/11/2014', <span className="label label-warning">in progress</span>, <span className="badge badge-danger">95%</span>],
      ['6', 'Tesla', 'Musk', '01/11/2014', <span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>],
      ['7', 'Ghost', 'XXX', '01/11/2014', <span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>]
    ]
  };

  // in render():
  <div className="row">
    <div className="col-md-8 col-md-offset-2">
      <EarningGraphComponent
        labels={this.state.labels}
        datasets={this.state.datasets}
      />
    </div>
  </div>
`;

function WorkProgress({actions: { enterWorkProgress, leaveWorkProgress },}: Props) {
  const [headers] = useState([
    '#',
    'Project',
    'Manager',
    'Deadline',
    'Status',
    'Progress',
  ]);
  /* eslint-disable react/jsx-key */
  const [content] = useState([
    [
      '1',
      'Facebook',
      'Mark',
      '10/10/2014',
      <span className="label label-danger">in progress</span>,
      <span className="badge badge-info">50%</span>,
    ],
    [
      '2',
      'Twitter',
      'Evan',
      '10/8/2014',
      <span className="label label-success">completed</span>,
      <span className="badge badge-success">100%</span>,
    ],
    [
      '3',
      'Google',
      'Larry',
      '10/12/2014',
      <span className="label label-warning">in progress</span>,
      <span className="badge badge-warning">75%</span>,
    ],
    [
      '4',
      'LinkedIn',
      'Allen',
      '10/01/2015',
      <span className="label label-info">in progress</span>,
      <span className="badge badge-info">65%</span>,
    ],
    [
      '5',
      'Tumblr',
      'David',
      '01/11/2014',
      <span className="label label-warning">in progress</span>,
      <span className="badge badge-danger">95%</span>,
    ],
    [
      '6',
      'Tesla',
      'Musk',
      '01/11/2014',
      <span className="label label-info">in progress</span>,
      <span className="badge badge-success">95%</span>,
    ],
    [
      '7',
      'Ghost',
      'XXX',
      '01/11/2014',
      <span className="label label-info">in progress</span>,
      <span className="badge badge-success">95%</span>,
    ],
  ]);
  /* eslint-enable react/jsx-key */

  useEffect(() => {
    enterWorkProgress();

    return () => {
      leaveWorkProgress();
    };
  }, []);

  return (
    <AnimatedView>
      {/* preview: */}
      <Panel
        title="Work Progress"
        hasTitle
        bodyBackGndColor={'#F4F5F6'}
        bodyCustomClass="table-responsive"
      >
        <Table>
          <TableHeader>
            {headers.map((header, headerIdx) => {
              return <TableCol key={headerIdx}>{header}</TableCol>;
            })}
          </TableHeader>
          <TableBody>
            {content.map((contentRow, contentRowIdx) => {
              return (
                <TableRow key={contentRowIdx}>
                  {contentRow.map((contentColumn, contentColumnIdx) => {
                    return (
                      <TableCol key={contentColumnIdx}>
                        {contentColumn}
                      </TableCol>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Panel>
      {/* source: */}
      <div className="row">
        <div className="col-xs-12">
          <Panel title="Source" hasTitle>
            <Highlight className="javascript">{source}</Highlight>
          </Panel>
        </div>
      </div>
    </AnimatedView>
  );
}

WorkProgress.displayName = 'WorkProgress';

WorkProgress.propTypes = {
  actions: PropTypes.shape({
    enterWorkProgress: PropTypes.func.isRequired,
    leaveWorkProgress: PropTypes.func.isRequired,
  }),
};

export default WorkProgress;
