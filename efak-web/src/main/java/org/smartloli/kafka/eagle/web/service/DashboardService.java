/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.smartloli.kafka.eagle.web.service;

import com.alibaba.fastjson.JSONArray;
import org.smartloli.kafka.eagle.common.protocol.topic.TopicLogSize;
import org.smartloli.kafka.eagle.common.protocol.topic.TopicRank;

import java.util.List;
import java.util.Map;

/**
 * Kafka Eagle dashboard data generator interface.
 *
 * @author smartloli.
 * <p>
 * Created by Jan 17, 2017.
 * <p>
 * Update by hexiang 20170216
 */
public interface DashboardService {

    /**
     * Get kafka & dashboard dataset interface.
     */
    public String getDashboardPanel(String clusterAlias);

    /**
     * Get topic logsize & capacity.
     */
    public JSONArray getTopicRank(Map<String, Object> params);

    /**
     * Clean up topic metadata that does not exist in zookeeper.
     */
    public List<TopicRank> getAllTopicRank(Map<String, Object> params);

    /**
     * Clean topic rank by logsize or capacity.
     */
    public void removeTopicRank(Map<String, Object> params);

    /**
     * Get and clean all topic tasks.
     */
    public List<TopicRank> getCleanTopicList(Map<String, Object> params);

    /**
     * Write statistics topic rank data from kafka jmx & insert into table.
     */
    public int writeTopicRank(List<TopicRank> topicRanks);

    /**
     * Write statistics topic logsize data from kafka jmx & insert into table.
     */
    public int writeTopicLogSize(List<TopicLogSize> topicLogSize);

    /**
     * Read topic lastest logsize diffval data.
     */
    public TopicLogSize readLastTopicLogSize(Map<String, Object> params);

    /**
     * Get os memory data.
     */
    public String getOSMem(Map<String, Object> params);

    /**
     * Get used cpu data.
     */
    public String getUsedCPU(Map<String, Object> params);

    /**
     * Get active topic numbers.
     */
    public String getActiveTopicNumbers(String clusterAlias, Map<String, Object> params);

}
