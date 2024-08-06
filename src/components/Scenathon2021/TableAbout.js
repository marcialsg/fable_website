import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}
td{
	border-color: transparent;
}
table tr:first-child th:first-child {
	background-color: #006b75;
	color: white;
	text-align: center;
	font-size: 3vh;
	padding-top: 1.5vh;
	padding-bottom: 1.5vh;
}

/* top-left border-radius */
table tr:first-child th:first-child {
	border-top-left-radius: 15px;
}
/* top-right border-radius */
table tr:first-child th:last-child {
	border-top-right-radius: 15px;
}

td{
	padding: 20px;
	padding-top: 35px;
	text-align: justify;
	font-weight: bold;
}
	
`;

const TableAbout = () => {
	return (
		<Styles>
			<table className="table">
				<tbody>
					<tr>
						<th>FABLE</th>
					</tr><tr>
						<td>
							This year, FABLE has made several improvements to the design of
							national pathways. First, all countries now present at least one
							Current Trends Pathway and one Sustainable Pathway to assess how far
							and how quickly improved policies can make land-use and food systems
							sustainable. Second, we have broadened the scope of the analysis to
							include freshwater, future climate-change impacts on crops, a richer
							discussion of biodiversity targets, and a more detailed trade
							analysis. Third, we have incorporated feedback on last year’s
							pathways. As a result, we now have greater confidence in the
							robustness of the FABLE pathways The Scenathon 2020 interactive
							dashboard allows you to navigate and query the data of the Scenathon
							2020. For more explanation please read our{" "}
							<a href="https://www.foodandlandusecoalition.org/fable/ " rel="noreferrer" target="_blank" >
								2020 report.</a>
						</td></tr>
				</tbody>
			</table>
		</Styles>
	)
}

export default TableAbout;