import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		height:100%;
	}

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    table tr:first-child th:first-child {
        background-color: #006b75;
        color: white;
    }
    table tr:first-child th:last-child {
        background-color: #006b75;
		color: white;
    }

    hr{
        border-top: 2px solid #dddddd!important;
	}
	
	/* top-left border-radius */
	table tr:first-child th:first-child {
		border-top-left-radius: 15px;
	}

	/* top-right border-radius */
	table tr:first-child th:last-child {
		border-top-right-radius: 15px;
	}

	.setBold{
		font-weight: bold;;
	}
	
`;

const TableB = () => {
	return (
		<Styles>
			<table className="table">
				<tbody>
					<tr>
						<th>Table B</th>
						<th colSpan="2">Achievement of FABLE Targets under the Current Trends and Sustainable Pathways</th>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td style={{ color: "#066e83" }}><div className="setBold">GLOBAL FABLE TARGET</div></td>
						<td style={{ color: "#066e83" }}><div className="setBold">CURRENT TRENDS</div></td>
						<td style={{ color: "#066e83" }}><div className="setBold">SUSTAINABLE</div></td>
					</tr>
					<tr>
						<td colSpan="3"><div className="setBold">Land and biodiversity</div></td>
					</tr>
					<tr>
						<td>
							Land where natural processes predominate.<br />
							No net loss by 2030 (globally) ...
						</td>
						<td>Achieved</td>
						<td>Achieved</td>
					</tr>
					<tr>
						<td>
							<p>
								Land where natural processes predominate.<br />
								...and an increase of at least 20% by 2050<br />
								in the area of land where natural processes<br />
								predominate (globally).
							</p>
						</td>
						<td>Not achieved</td>
						<td>Not achieved</td>
					</tr>
					<tr>
						<td><div className="setBold">Zero net deforestation globally by 2030</div></td>
						<td>Not achieved</td>
						<td>Achieved</td>
					</tr>
					<tr>
						<td colSpan="3"><div className="setBold">GHG emissions from AFOLU</div></td>
					</tr>
					<tr>
						<td>
							<p>
								Global GHG from Agriculture less than<br />
								4 GtCO<sub>2</sub>e yr<sup>-1</sup> by 2050
							</p>
						</td>
						<td>Not achieved</td>
						<td>
							Almost achieved<br />
							(4.1 GtC02e yr<sup>-1</sup>)
						</td>
					</tr>
					<tr>
						<td>
							<p>
								Global GHG from LULUCF less than<br />
								0 GtCO<sub>2</sub>e yr<sup>-1</sup> by 2050
							</p>
						</td>
						<td>Not achieved</td>
						<td>Achieved</td>
					</tr>
					<tr>
						<td colSpan="3"><div className="setBold">Food Security</div></td>
					</tr>
					<tr>
						<td>
							<p>
								Average calorie consumption per capita<br />
								greater than the average minimum daily<br />
								energy requirement in all countries by 2030
							</p>
						</td>
						<td>Achieved</td>
						<td>Achieved</td>
					</tr>
					<tr>
						<td colSpan="3"><div className="setBold">Fresh Water</div></td>
					</tr>
					<tr>
						<td>
							<p>
								Global consumptive blue water use less than<br />
								2,453 km3yr<sup>-1</sup> by 2050 (global <br />
								estimates in the range of 670-4044 km3yr<sup>-1</sup>)
							</p>
						</td>
						<td>
							Achieved
							<p>
								(but not achieved for the lower<br />
								boundary of the literature estimates)
							</p>
						</td>
						<td>
							Achieved
							<p>
								(but not achieved for the lower<br />
								boundary of the literature estimates)
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</Styles>
	)
}

export default TableB;