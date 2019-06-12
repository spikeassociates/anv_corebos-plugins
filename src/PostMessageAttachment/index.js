import React from 'react';
import { connect } from 'react-redux';
import { getPost } from 'mattermost-redux/selectors/entities/posts';
import { Bar, Line, Pie } from 'react-chartjs-2';

const charts = {
  Pie: {
    component: Pie
  },
  Line: {
    component: Line
  },
  Bar: {
    component: Bar
  }
};

const PostMessageAttachment = ({ chartData }) => {
  if (!chartData) {
    return null;
  }

  const { type, data } = chartData;
  const chartOptions = {
    data,
    options: {
      maintainAspectRatio: false
    }
  };
  const chart = charts[type] || charts['Bar'];
  const ChartComponent = chart.component;

  return <ChartComponent {...chartOptions} {...chart.options || {}} />;
};

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.postId.replace("user-activity-", "");
  const post = getPost(state, postId);

  try {
    if (post.props && post.props.chartdata) {
      return { chartData: JSON.parse(post.props.chartdata) };
    }
  } catch (e) {}

  return {};
};

export default connect(
  mapStateToProps,
  null
)(PostMessageAttachment);
